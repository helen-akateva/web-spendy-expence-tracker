import { NextRequest, NextResponse } from "next/server";

// Публічні маршрути (доступні без авторизації)
const publicRoutes = ["/login", "/register"];

// Приватні маршрути (потребують авторизації)
const privateRoutes = ["/", "/statistics", "/currency", "/transactions"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Отримуємо accessToken з cookies
  const accessToken = request.cookies.get("accessToken")?.value;

  // Перевіряємо чи це публічний маршрут
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Перевіряємо чи це приватний маршрут
  const isPrivateRoute = privateRoutes.some((route) => {
    // Для головної сторінки перевіряємо точну відповідність
    if (route === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(route);
  });

  // Користувач НЕ авторизований (немає accessToken)
  if (!accessToken) {
    if (isPrivateRoute) {
      // Спроба доступу до приватного маршруту без авторизації
      // Редірект на сторінку логіна
      console.log(`[Middleware] Unauthorized access to ${pathname}, redirecting to /login`);
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Доступ до публічного маршруту - дозволяємо
    if (isPublicRoute) {
      return NextResponse.next();
    }
  }

  // Користувач авторизований (є accessToken)
  if (accessToken) {
    // Спроба доступу до публічного маршруту (login/register)
    if (isPublicRoute) {
      // Редірект на головну сторінку
      console.log(`[Middleware] Authorized user accessing ${pathname}, redirecting to /transactions`);
      return NextResponse.redirect(new URL("/transactions", request.url));
    }

    // Доступ до приватного маршруту - дозволяємо
    if (isPrivateRoute) {
      return NextResponse.next();
    }
  }

  // Якщо маршрут не в списку - редіректимо на login для безпеки
  console.log(`[Middleware] Unknown route ${pathname}, redirecting to /login`);
  return NextResponse.redirect(new URL("/login", request.url));
}

// Налаштування matcher - визначаємо які маршрути обробляє middleware
export const config = {
  matcher: [
    // Публічні маршрути
    "/login",
    "/register",
    // Приватні маршрути
    "/",
    "/statistics",
    "/currency",
    "/transactions",
  ],
};
