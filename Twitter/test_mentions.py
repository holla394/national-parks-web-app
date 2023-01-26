from mentions import getMentions
import pickle

with open('handle_list', 'rb') as file:
    handle_list = pickle.load(file)

mention_list = []
for handle in handle_list:
    data = getMentions(handle)
    temp_dict = {handle:data}
    mention_list.append(temp_dict)

