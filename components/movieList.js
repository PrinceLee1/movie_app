import { View, Text, ScrollView, Image, Dimensions } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import {styles} from '../theme'
import { TouchableWithoutFeedback } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { fallbackMoviePoster, image185 } from '../api/moviedb'
var { width, height } = Dimensions.get('window');

export default function MovieList({title, data, hideSeeAll}) {
    const navigation = useNavigation();
return (
    <View className="mb-8 space-y-4 ml-4">
        <View className="mx-4 flex-row justify-between items-center">
            <Text className="text-white text-xl">
                {title}
            </Text>
            {
                !hideSeeAll && (
                    <TouchableOpacity>
                        <Text style={styles.text} className="text-lg">See All</Text>
                    </TouchableOpacity>
                )
            }
        </View>
        { /*movie row*/ }
        {
            data.length>0?(
                <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingHorizontal: 15}}
            >
                {
                    data.map((item, index) => {
                        return (
                            <TouchableWithoutFeedback
                                key={index}
                                onPress={() => navigation.push('Movie', item)}
                            >
                                <View className="space-y-1 mr-4">
                                    <Image
                                        source={{uri: image185(item.poster_path) || fallbackMoviePoster}}
                                        // source={require('../assets/images/moviePoster2.jpeg')}
                                        className="rounded-3xl"
                                        style={{width: width*0.33, height: height*0.22 }}
                                    />
                                    <Text className="text-neutral-300 ml-1">
                                        {
                                        item.title.length>14? item.title.slice(0,14)+ '...': item.title
                                        }
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        )
                    })
                }
            </ScrollView>
            ):(
                <View className="justify-center mt-4">
                    <Text className="text-neutral-400 text-center font-bold mt-10">No Featured movies available!</Text>
                </View>
            )
        }

    </View>
  )
}