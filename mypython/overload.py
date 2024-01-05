'''
    count number chars for given string and optional starting position 
'''

'''
def count(name):
    return len(name)
def count(name, start):
    return len(name[start:])

print(count('nithin'))
print(count('nithin',3))
'''

def count(name, start=0):
    return len(name[start:])

print(count('nithin'))
print(count('nithin',3))
print(count(start=3, name='nithin'))

def join(*names):
    x = ''
    for e in names:
        x += e + ' '
    return x

print(join('nithin','neelakanta','rao'))

def joinv2(**names):
    x = ''
    for e in names:
        x += names[e] + ' '
    return x

print(joinv2(first_name='nithin',last_name='neelakanta',surname='rao'))