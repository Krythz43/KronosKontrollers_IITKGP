#include<bits/stdc++.h>
using namespace std;

int main(){
    string s;
    cin>>s;

    vector <string> a;
    string temp = "";

    for(int i = 0;i < s.length();i++){
        if(strcmp(s[i], ',')){
            if(temp.size() == 0)continue;
            else {
                a.push_back(temp);
                temp = "";
            }
        }
        else temp += s[i];

        for(auto x: a){
            cout<<"{ value: \'"<<x<<"\', label: "<<"\'"<<x<<"\' }"<<endl;
        }
    }
}