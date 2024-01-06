#include<iostream>
#include<cstring>
#include<string>
#include <functional>
#include <memory>

using namespace std;

template <typename T>
class Vector
{
    private:
        unique_ptr<T[]> items_;
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
        void clear(bool isByUser);

        typedef T* Iterator;

        Iterator begin();
        Iterator end();
};

template <typename T>
Vector<T>::Vector() : size_(0), capacity_(0)
{   
    reserve(1);
    size_ = 0;
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
    items_=make_unique<T[]>(size_);//alloc
    for(int i=0;i<size_;i++){
        items_[i]=RHS.items_[i];
    }
}

template <typename T>
Vector<T>::~Vector(){
    clear(false);
}
template <typename T>
void Vector<T>::clear()
{
    clear(true);
}
template <typename T>
void Vector<T>::clear(bool isByUser)
{
    if(items_){
        memset(items_.get(), 0, capacity_*sizeof(T));
        if(isByUser){
            items_.release();
        }
    }
    size_ = 0;
    capacity_ = 0;
}
template <typename T>
void Vector<T>::reserve(int new_capacity_)
{
    if(new_capacity_ <= capacity_){
        return;
    }
    unique_ptr<T[]> new_items_ = make_unique<T[]>(new_capacity_); // 1-new allocs
    if(items_){  // 2-copy old items to new items 
        for(int I = 0; I < capacity_; I++){
            new_items_[I] = items_[I];
        }
    
        memset(items_.get(), 0, capacity_ * sizeof(T));
        items_.release();        // 3-delete free allocs
    }
    items_ = move(new_items_);
    capacity_ = new_capacity_;/**/
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
typename Vector<T>::Iterator Vector<T>::begin()
{
    return items_.get();
}
template <typename T>
typename Vector<T>::Iterator Vector<T>::end()
{
    return begin() + size_;
}

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

template<class T>
int process_list(string caption, Vector<T>& list){   
    cout << caption << ":";
    for(int I = 0; I < list.size(); I++){
        cout << list[I] << ",";
    }
    cout << endl;

    if(!list.empty()){
        cout << "At Front:" << list.front() << ",At Back:" << list.back() << endl;
    }
    
    cout << caption << " By Iterator:";
    for(auto p = list.begin(); p != list.end(); p++){
        cout << (*p) << " ";
    }
    cout << endl << endl ;
    
    return 0;
}

int main(){
    Vector<int> ages;
    Vector<double> salaries;
    Vector<Person> persons;
    auto add_ages = [&ages]()->void {
        ages.push_back(23);
        ages.push_back(44);
        ages.push_back(39);
    };
    auto add_salaries = [&salaries]()->void {
        salaries.push_back(1500.0);
        salaries.push_back(1300.0);
        salaries.push_back(1800.0);
    };
    function<void()> add_persons = [&persons]()->void {
        persons.push_back(Person("nithin","neelakanta"));
        persons.push_back(Person("pranov","nithin"));
        persons.push_back(Person("mani mahesh","nithin"));
    };
    

    add_ages();
    add_salaries();
    add_persons();

    process_list<int>("Ages",ages);
    process_list<double>("Salaries",salaries);
    process_list<Person>("Persons",persons);

    return 0;
}