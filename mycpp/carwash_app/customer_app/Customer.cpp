#include<iostream>
#include<cstring>
#include "Customer.hpp"
using namespace std;

//friend
ostream& operator<<(ostream& output, const Customer& customer) {
    output  << "["
            << customer.id << ", "
            << customer.name << ", "
            << customer.mobile << ", "
            << customer.password << ", "
            << (customer.location == nullptr ? "NA" : customer.location)
            << "]";
    return output;
}
        
Customer::Customer() : Customer(0, (char*)"", (char*)"", (char*)"", (char*)"") {

}

Customer::Customer(int id_, 
            char name_[], 
            char mobile_[], 
            char password_[], 
            char location_[]) {
    
    id = id_;
    strcpy(name, name_);
    strcpy(mobile, mobile_);
    strcpy(password, password_);

    if(location == nullptr) {
        location = new char[255];
    }
    strcpy(location, location_);
    
}

Customer::Customer(const Customer& RHS) : Customer(RHS.id, (char*)RHS.name, (char*)RHS.mobile, (char*)RHS.password, (char*)RHS.location){
    
}

Customer::Customer(Customer&& RHS) {
    id = RHS.id;
    strcpy(name, RHS.name);
    strcpy(mobile, RHS.mobile);
    strcpy(password, RHS.password);
    location = RHS.location;

    RHS.id = 0;
    strcpy(RHS.name, "");
    strcpy(RHS.mobile, "");
    strcpy(RHS.password, "");
    RHS.location = nullptr;
}

Customer& Customer::operator=(const Customer& RHS) {
    id = RHS.id;
    strcpy(name, RHS.name);
    strcpy(mobile, RHS.mobile);
    strcpy(password, RHS.password);
    if(location == nullptr) {
        location = new char[255];
    }
    strcpy(location, RHS.location);
}

Customer& Customer::operator=(Customer&& RHS) {
    id = RHS.id;
    strcpy(name, RHS.name);
    strcpy(mobile, RHS.mobile);
    strcpy(password, RHS.password);
    location = RHS.location;

    RHS.id = 0;
    strcpy(RHS.name, "");
    strcpy(RHS.mobile, "");
    strcpy(RHS.password, "");
    RHS.location = nullptr;
}

Customer::~Customer() {
    id = 0;
    strcpy(name, "");
    strcpy(mobile, "");
    strcpy(password, "");
    strcpy(location, "");
    if(location != nullptr){
        delete[] location;
        location = nullptr;
    }
}