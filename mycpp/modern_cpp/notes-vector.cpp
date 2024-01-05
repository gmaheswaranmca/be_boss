capactity_ = 1

recapacity()
    capactity_ = 2 * capactity_

realloc(is_to_recapactity=true)    
    if(is_to_recapactity){
        recapacity();     
    }           
    
    new_items_ = new T[capactity_]; // 1-new allocs
    if(old_items_ != nullptr){  // 2-copy old items to new items       
        for(int I = 0; I < size_; I++){
            new_items_[I] = items_[I];
        }
    }
    delete[] items_;        // 4-delete free allocs
    items_ = new_items_;


push_back(T item)
    if(size_ == capacity_){
        realloc();
    }
    items_[size_] = item;
    size++;

pop_back()
    if(!empty()){
        size_ --;
    }

fit_to_size()
    capactiy_ = size_;
    realloc(false) 
    




