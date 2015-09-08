# Name : Thomas van der Veen
# Student number : 10346481
'''
This module contains an implementation of split_string.
'''

# You are not allowed to use the standard string.split() function, use of the
# regular expression module, however, is allowed.
# To test your implementation use the test-exercise.py script.

# A note about the proper programming style in Python:
#
# Python uses indentation to define blocks and thus is sensitive to the
# whitespace you use. It is convention to use 4 spaces to indent your
# code. Never, ever mix tabs and spaces - that is a source of bugs and
# failures in Python programs.


def split_string(source, separators):
	'''
    Split a string <source> on any of the characters in <separators>.

    The ouput of this function should be a list of strings split at the
    positions of each of the separator characters.
	'''
	rv = [] # Empty variables
	string = ""
	previous = ""
	for char in source: #Loop over the source and add non seprator characters into the string
		if char not in separators:
			string += char
		elif previous not in separators:
				rv.append(string) # Put string in the list and reset it
				string = ""
		previous = char
	if string != '': # Solution for when the last string has not yet been appended
		rv.append(string)
	return rv

 



if __name__ == '__main__':
    # You can try to run your implementation here, that will not affect the
    # automated tests.
    print split_string('abacadddcabra', 'ba')  # should print: ['c', 'd', 'r']