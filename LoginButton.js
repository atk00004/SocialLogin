import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { LoginButton, AccessToken, LoginManager, Profile, GraphRequest, GraphRequestManager } from 'react-native-fbsdk-next';

 class Login extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            name: '',
            id: '',
            imgUrl: '',
            email: '',
            firstName: '',
            lastName: '',
            middleName: '',
            linkUrl: '',
            dob: '',
        }
    }
    loginFb = async () => {
        var name = '';
        var id = '';
        var imgUrl = '';
        var email ='';
        var firstName ='';
        var lastName = '';
        var middleName = '';
        var linkUrl = '';
        var dob='';

        let result = await LoginManager.logInWithPermissions(['public_profile']);
        const currentProfile = await Profile.getCurrentProfile();
        if(result.isCancelled) {
            alert('canclled')
        } else {
            if(currentProfile) {
                name = currentProfile.name;
                id = currentProfile.userID;
                lastName = currentProfile.lastName;
                firstName = currentProfile.firstName;
                middleName = currentProfile.middleName;
                imgUrl = currentProfile.imageURL;
            }
               await AccessToken.getCurrentAccessToken().then(
                    (data) => {
                      let accessToken = data.accessToken;
                      console.log(accessToken.toString());
          
                      const responseInfoCallback = (error, result) => {
                        if (error) {
                          console.log(error)
                          alert('Error fetching data: ' + error.toString());
                        } else {
                          console.log(result);
                          email = result.email;
                          dob = result.birthday;
                          linkUrl = result.link
                          this.setState({email, dob, linkUrl});
                        }
                      }
          
                      const infoRequest = new GraphRequest(
                        '/me',
                        {
                          accessToken: accessToken,
                          parameters: {
                            fields: {
                              string: 'name, birthday, email, link, hometown, age_range'
                            }
                          }
                        },
                        responseInfoCallback
                      );
          
                      // Start the graph request.
                      new GraphRequestManager().addRequest(infoRequest).start();
          
                    })
        }
        this.setState({
            name,
            id,
            imgUrl,
            firstName,
            lastName,
            middleName,
            linkUrl,
        })
    }
  render() {
    return (
      <View style={{
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          margin: 10,
      }}>
        <Text style={{
            fontSize: 16,
            padding: 10,
            width: '80%',
            borderColor: '#ff456f',
            borderWidth: 1
        }}>
            Name: {this.state.name}
        </Text>
        <Text
         style={{
            fontSize: 16,
            padding: 10,
            width: '80%',
            borderColor: '#ff456f',
            borderWidth: 1
        }}>
            Profile ID: {this.state.id} 
        </Text>
        <Text
         style={{
            fontSize: 16,
            padding: 10,
            width: '80%',
            borderColor: '#ff456f',
            borderWidth: 1
        }}>
            First Name: {this.state.firstName} 
        </Text>
        <Text
         style={{
            fontSize: 16,
            padding: 10,
            width: '80%',
            borderColor: '#ff456f',
            borderWidth: 1
        }}>
            Last Name: {this.state.lastName} 
        </Text>
        <Text
         style={{
            fontSize: 16,
            padding: 10,
            width: '80%',
            borderColor: '#ff456f',
            borderWidth: 1
        }}>
            Middle Name: {this.state.middleName} 
        </Text>
        <Text style={{
            fontSize: 16,
            padding: 10,
            width: '80%',
            borderColor: '#ff456f',
            borderWidth: 1
        }}>
            Date of birth: {this.state.dob}
        </Text>
        <Text style={{
            fontSize: 16,
            padding: 10,
            width: '80%',
            borderColor: '#ff456f',
            borderWidth: 1
        }}
            numberOfLines={2}
        >
            LinkUrl: {this.state.linkUrl}
        </Text>
        <Text
         style={{
            fontSize: 16,
            padding: 10,
            width: '80%',
            borderColor: '#ff456f',
            borderWidth: 1
        }}>
            Email: {this.state.email} 
        </Text>
        <Image
            source={{uri: this.state.imgUrl}}
            style={{
                padding: 10,
                height: 100,
                width: '80%',
                borderColor: '#ff456f',
                borderWidth: 1
            }}
            resizeMode='contain'
        />
        <TouchableOpacity 
            onPress ={this.loginFb}
            style={{
                height: 40,
                width: '60%',
                backgroundColor: 'blue',
                borderColor: 'black',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 10,
            }}
        >
            <Text style={{
                fontSize: 20,
                color: 'white'
            }}>LoginFacebook</Text>    
        </TouchableOpacity>
      </View>
    );
  }
}
export default Login;