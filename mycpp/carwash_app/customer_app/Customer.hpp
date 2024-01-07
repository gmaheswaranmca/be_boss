#include<stdio.h>
using namespace std;
class Customer {
    private:
        int id;
        char name[255];
        char mobile[20];
        char password[50];
        char location[255];
    public:
        friend ostream& operator<<(ostream& output, const Customer& customer);
        Customer();
        Customer(const Customer& RHS);
        Customer(const Customer&& RHS);
        Customer& operator=(const Customer& RHS);
        Customer& operator=(const Customer&& RHS);
        ~Customer();
};

