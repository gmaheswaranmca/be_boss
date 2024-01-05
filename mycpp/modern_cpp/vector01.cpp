#include<iostream>
#include<cstring>
#include<string>
using namespace std;

template <typename T>
class Vector
{
    private:
        T* items_;
        int size_;
        int capacity_;
    public:
        
        Vector();
        Vector(Vector<T> &);
        Vector(int);
        ~Vector();

        void reserve(int);

        int size();
        int capacity();
        
        T& operator[](int);
        bool empty();
        T& front();
        T& back();

        void push_back(T);        
        void pop_back();        
        void clear();

        typedef T* Iterator;

        Iterator begin();
        Iterator end();
};

template <typename T>
Vector<T>::Vector() : size_(0), capacity_(0), items_(nullptr)
{    
}

template <typename T>
Vector<T>::Vector(int size_):size_(size_), capacity_(size_)
{
    reserve(size_);
}

template <typename T>
Vector<T>::Vector(Vector<T> &RHS)
{
    size_=RHS.size_;
    capacity_=RHS.capacity_;
    items_=new T[size_];
    for(int i=0;i<size_;i++){
        items_[i]=RHS.items_[i];
    }
}

template <typename T>
Vector<T>::~Vector(){
    clear();
}

template <typename T>
void Vector<T>::reserve(int new_capacity_)
{
    if(new_capacity_ <= capacity_){
        return;
    }
    T* new_items_ = new T[new_capacity_] {}; // 1-new allocs
    if(items_ != nullptr){  // 2-copy old items to new items 
        for(int I = 0; I < capacity_; I++){
            new_items_[I] = items_[I];
        }
    
        memset(items_, 0, capacity_ * sizeof(T));
        delete[] items_;        // 3-delete free allocs
    }
    items_ = new_items_;
    capacity_ = new_capacity_;
}

template <typename T>
int Vector<T>::size()
{
    return size_;
}

template <typename T>
int Vector<T>::capacity()
{
    return capacity_;
}

template <typename T>
bool Vector<T>::empty()
{
    return (size_ == 0);
}
template <typename T>
T& Vector<T>::front()
{
    return items_[0];
}
template <typename T>
T& Vector<T>::back()
{
    return items_[size_ - 1];
}

template <typename T>
T& Vector<T>::operator[](int i)
{
    return items_[i];
}
template <typename T>
void Vector<T>::push_back(T item)
{
    if(size_==capacity_)
    {
        if(capacity_ == 0)
            reserve(1);
        else
            reserve(2 * capacity_);
    }

    items_[size_] = item;
    size_++;
}

template <typename T>
void Vector<T>::pop_back()
{
    size_--;
}

template <typename T>
void Vector<T>::clear()
{
    if(items_ != nullptr){
        memset(items_,0,capacity_*sizeof(T));
        delete[] items_;
        items_=nullptr;
    }
    size_ = 0;
    capacity_ = 0;
}

template <typename T>
typename Vector<T>::Iterator Vector<T>::begin()
{
    return items_;
}
template <typename T>
typename Vector<T>::Iterator Vector<T>::end()
{
    return items_ + size_;
}

int main_ages() {
    Vector<int> ages;
    ages.push_back(23);
    ages.push_back(44);
    ages.push_back(39);


    cout << "Ages:";
    for(int I = 0; I < ages.size(); I++){
        cout << ages[I] << ",";
    }
    cout << endl;

    if(!ages.empty()){        
        cout << "At Front:" << ages.front() << ",At Back:" << ages.back() << endl;
    }

    cout << "Ages By Iterator:";
    for(Vector<int>::Iterator p = ages.begin(); p != ages.end(); p++){
        cout << (*p) << " ";
    }
    cout << endl;

    return 0;
}

int main_salaries(){
    Vector<double> salaries;
    salaries.push_back(1500.5);
    salaries.push_back(1300.6);
    salaries.push_back(1800.0);


    cout << "Salaries:";
    for(int I = 0; I < salaries.size(); I++){
        cout << salaries[I] << ",";
    }
    cout << endl;

    if(!salaries.empty()){
        cout << "At Front:" << salaries.front() << ",At Back:" << salaries.back() << endl;
    }

    cout << "Salaries By Iterator:";
    for(Vector<double>::Iterator p = salaries.begin(); p != salaries.end(); p++){
        cout << (*p) << " ";
    }
    cout << endl;

    return 0;
}

struct Person {
    private:
        string first_name;
        string last_name;
    public:
        Person():first_name(""),last_name(""){}
        Person(string first_name, string last_name):first_name(first_name),last_name(last_name){}
       
        friend ostream& operator<<(ostream& output, const Person& person) {
            output << "[" << person.first_name << "," << person.last_name << "]";
            return output;
        }
};

int main_persons(){
    Vector<Person> persons;
    persons.push_back(Person("nithin","neelakanta"));
    persons.push_back(Person("pranov","nithin"));
    persons.push_back(Person("mani mahesh","nithin"));


    cout << "Persons:";
    for(int I = 0; I < persons.size(); I++){
        cout << persons[I] << ",";
    }
    cout << endl;

    if(!persons.empty()){
        cout << "At Front:" << persons.front() << ",At Back:" << persons.back() << endl;
    }

    cout << "Persons By Iterator:";
    for(Vector<Person>::Iterator p = persons.begin(); p != persons.end(); p++){
        cout << (*p) << " ";
    }
    cout << endl;

    return 0;
}

int main(){
    main_ages();
    main_salaries();
    main_persons();
    return 0;
}