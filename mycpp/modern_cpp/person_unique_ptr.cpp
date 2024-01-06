#include<iostream>
#include<string>
#include <memory>
using namespace std;
struct Person{
    private:
        string first_name;
        string last_name;
    public:
        Person():first_name(""),last_name(""){}
        Person(string first_name, string last_name):first_name(first_name),last_name(last_name){}
        friend ostream& operator<<(ostream& output, const Person& person){
            output << "[" << person.first_name << "," << person.last_name << "]";
            return output;
        }
};

int main(){
    unique_ptr<Person[]> p1 = make_unique<Person[]>(3);
    if(p1){
        p1[0] = Person("nithin","neelakanta");
        p1[1] = Person("pranov","nithin");
        p1[2] = Person("mani mahesh","nithin");

        for(int I = 0; I < 3; I++){
            cout << p1[I] << " ";
        }
    }
    //p1.release(); // no need to call
    return 0;
}