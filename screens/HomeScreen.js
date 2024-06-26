import { View, Text, Platform, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native";
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import React, { useEffect, useState } from 'react'
import { StatusBar } from "expo-status-bar";
import { styles } from "../theme";
import TrendingMovies from "../components/trendingMovies";
import MovieList from "../components/movieList";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/loading";
import { fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies } from "../api/moviedb";
const ios = Platform.OS == 'ios';

export default function HomeScreen(){
    const [trending, setTrending] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const [loading, setLoading] = useState(true)
    const navigation = useNavigation();
    useEffect(() => {
        getTrendingMovies();
        getUpcomingMovies();
        getTopRatedMovies();

    }, [])
    const getTrendingMovies = async () => {
        const data = await fetchTrendingMovies();
        if(data && data.results) setTrending(data.results)
        setLoading(false)
    }
    const getUpcomingMovies = async () => {
        const data = await fetchUpcomingMovies();
        if(data && data.results) setUpcoming(data.results)
        setLoading(false) 
    }
    const getTopRatedMovies = async () => {
        const data = await fetchTopRatedMovies();
        if(data && data.results) setTopRated(data.results)
        setLoading(false)
    }
  return (
    <View className="flex-1 bg-neutral-800"> 
        <SafeAreaView className={ios? "-mb-2": 'mb-3'}>
            <StatusBar style="light"/>
            <View className="flex-row justify-between items-center mx-4">
                <Bars3CenterLeftIcon size="30" strokeWidth={2} color="white"/>
                <Text className="text-white text-3xl font-bold">
                    <Text style={styles.text}>M</Text>ovies
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                    <MagnifyingGlassIcon size="30" strokeWidth={2} color="white"/>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
        {
            loading? (
                <Loading/>
            ) : (
                <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: 10}}
            >
                { /* Trending movies carousel */ }
                {trending.length>0 && <TrendingMovies data={trending}/>}
    
                { /* upcoming movies */ }
                <MovieList title="Upcoming" data={upcoming}/>
    
                { /* top rated movies row */ }
                <MovieList title="Top Rated" data={topRated}/>
    
            </ScrollView>
            )
        }

    </View>
  )
}
