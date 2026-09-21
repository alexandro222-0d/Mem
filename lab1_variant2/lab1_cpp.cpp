/*
 * Лабораторная работа 1. Программирование линейных алгоритмов.
 * Вариант 2.
 *
 * Вычислить:
 *   u = cbrt(5 + |x - y|^2) / (sin(x^2) + z^y) - e^|x - y|
 *
 * Способ 2: стандартные потоки ввода/вывода языка C++ (cin/cout).
 */
#include <iostream>
#include <conio.h>
#include <cmath>

using namespace std;

int main()
{
    double x, y, z, a, b, u;

    cout << "\n\t x, y, z = " << endl;
    cin >> x >> y >> z;

    a = pow(5.0 + pow(fabs(x - y), 2), 1.0 / 3.0);
    b = sin(x * x) + pow(z, y);
    u = a / b - exp(fabs(x - y));

    cout << "\n x = " << x
         << "\n y = " << y
         << "\n z = " << z
         << "\n u = " << u << endl;
    cout << "Press any key ... " << endl;
    getch();
    return 0;
}
