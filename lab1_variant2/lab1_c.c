/*
 * Лабораторная работа 1. Программирование линейных алгоритмов.
 * Вариант 2.
 *
 * Вычислить:
 *   u = cbrt(5 + |x - y|^2) / (sin(x^2) + z^y) - e^|x - y|
 *
 * Способ 1: стандартные функции ввода/вывода языка C (scanf/printf).
 */
#include <stdio.h>
#include <conio.h>
#include <math.h>

int main()
{
    double x, y, z, a, b, u;

    puts("\n\t x, y, z = ");
    scanf("%lf %lf %lf", &x, &y, &z);

    a = pow(5.0 + pow(fabs(x - y), 2), 1.0 / 3.0);
    b = sin(x * x) + pow(z, y);
    u = a / b - exp(fabs(x - y));

    printf("\n x = %.7g\n y = %.7g\n z = %.7g\n u = %f\n", x, y, z, u);
    puts("Press any key ... ");
    getch();
    return 0;
}
