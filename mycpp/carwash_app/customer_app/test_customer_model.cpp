#include<iostream>
#include "Customer.hpp"
using namespace std;

int main(){
    Customer mahesh(1001, (char*)"mahesh", (char*)"1001", (char*)"4321", (char*)"Trichy"); //arg constructor
    Customer waran(mahesh); //copy constructor
    cout << endl << "***copy constructor:***" << endl;
    cout << mahesh << endl;
    cout << waran << endl;

    Customer nithin(1002, (char*)"nithin", (char*)"1002", (char*)"4321", (char*)"Mysore"); 
    Customer neelakanta(move(nithin)); //move constructor
    cout << endl << "***move constructor:***" << endl;
    cout << nithin << endl;
    cout << neelakanta << endl;

    Customer murali(1003, (char*)"murali", (char*)"1003", (char*)"4321", (char*)"Trichy"); //arg constructor
    Customer dharan; //no arg constructor
    dharan = murali; //copy =
    cout << endl << "***copy =:***" << endl;
    cout << murali << endl;
    cout << dharan << endl;

    Customer viji(1004, (char*)"viji", (char*)"1004", (char*)"4321", (char*)"Trichy"); //arg constructor
    Customer kalyan; //no arg constructor
    kalyan = move(viji); //move =
    cout << endl << "***move =:***" << endl;
    cout << viji << endl;
    cout << kalyan << endl;
    return 0;
}
