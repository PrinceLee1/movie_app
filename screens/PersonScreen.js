import { View, Text, Dimensions, Platform, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { styles } from '../theme';
import { useNavigation, useRoute } from '@react-navigation/native';
import MovieList from '../components/movieList';
import Loading from '../components/loading';
import { fallbacPersonImage, fetchCastDetails, fetchCastMovies, image342 } from '../api/moviedb';

var { width, height } = Dimensions.get('window');
const ios = Platform.OS == 'ios';
const verticalMargin = ios ? "" : "my-3";

export default function PersonScreen() {
    const navigation = useNavigation();
    const [isFavorite, toogleFavorite] = useState(false);
    const [personMovies, setPersonMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [person, setPerson] = useState({})
    const {params: item} = useRoute();

    useEffect(() => {
        setLoading(true)
        getCastDetails(item.id);
        getCastMovies(item.id);
    }, [item]);

    const getCastDetails = async id => {
        const data = await fetchCastDetails (id)
        // console.log(data)
        if(data) setPerson(data);
        setLoading(false)
    }

    const getCastMovies = async id => {
        const data = await fetchCastMovies (id)
        // console.log(data)
        if(data && data.cast) setPersonMovies(data.cast);
        setLoading(false)

    }


  return (
    <ScrollView className="flex-1 bg-neutral-900" contentContainerStyle={{paddingBottom: 20}}>
      {/* back button */}
      <SafeAreaView className={" z-20 w-full flex-row justify-between items-center px-4"+verticalMargin }>
            <TouchableOpacity onPress={() => navigation.goBack()} className="rounded-xl p-1" style={styles.background}>
                <ChevronLeftIcon size="28" strokeWidth={2.5} color="white"/> 
            </TouchableOpacity>
            <TouchableOpacity onPress={() => toogleFavorite(!isFavorite)}>
                <HeartIcon size="35" color={isFavorite ? "red" : "white"}/>
            </TouchableOpacity>
        </SafeAreaView>

        {/* person details */}
        {
            loading? (
                <Loading/>
            ):(
                <View>
                <View 
                    className="flex-row justify-center"
                    style={{
                        shadowColor: "gray",
                        shadowRadius: 40,
                        shadowOffset: {width: 0, height: 5},
                        shadowOpacity: 1
                    }}
                >
                    <View className="rounded-full items-center overflow-hidden h-72 w-72 border-2 border-neutral-500">
                    <Image 
                        source={{uri: image342(person?.profile_path) || fallbacPersonImage}}
                        style={{height: height*0.43, width: width*0.74}}
                    />
                    </View>
                </View>
                <View className="mt-6">
                    <Text className="text-3xl font-bold text-white text-center">
                   {person?.name}
                    </Text>
                    <Text className="text-base font-bold text-neutral-500 text-center">
                    {person?.place_of_birth}
                    </Text> 
                </View>
                <View className="mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full">
                    <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                        <Text className="text-white font-semibold">
                            Gender
                        </Text>
                        <Text className="text-neutral-300 text-sm">
                        {person?.gender == 1? 'Female' : 'Male'}

                        </Text>
                    </View>
                    <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                        <Text className="text-white font-semibold">
                            Birthday
                        </Text>
                        <Text className="text-neutral-300 text-sm">
                        {person?.birthday}

                        </Text>
                    </View>
                    <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                        <Text className="text-white font-semibold">
                            Known For
                        </Text>
                        <Text className="text-neutral-300 text-sm">
                        {person?.known_for_department}

                        </Text>
                    </View>
                    <View className="px-2 items-center">
                        <Text className="text-white font-semibold">
                            Popularity
                        </Text>
                        <Text className="text-neutral-300 text-sm">
                        {person?.popularity?.toFixed(2)}%
                        </Text>
                    </View>
                </View>
                <View className="my-6 mx-4 space-y-4">
                    <Text className="text-white text-lg font-bold">Biography</Text>
                    <Text className="text-neutral-400 tracking-wide">
                    {person?.biography || 'N/A'} 
                    </Text>
                </View>
                <MovieList title={'Featured In'} hideSeeAll={true} data={personMovies} />
            </View>
            )
        }

    </ScrollView>
  )
}