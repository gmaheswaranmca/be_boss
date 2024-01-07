#include<iostream>
using namespace std;
class Customer {
    private:
        int id;
        char name[255];
        char mobile[20];
        char password[50];
        char* location;
    public:
        friend ostream& operator<<(ostream& output, const Customer& customer);
        
        Customer();
        Customer(int id, 
            char name[], 
             char mobile[], 
             char password[], 
             char location[]);
        Customer(const Customer& RHS);
        Customer(Customer&& RHS);
        Customer& operator=(const Customer& RHS);
        Customer& operator=(Customer&& RHS);

        ~Customer();
};



