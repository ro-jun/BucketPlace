import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState, useEffect } from "react";
import { ActivityIndicator, Dimensions } from "react-native";
import Swiper from 'react-native-web-swiper';
import styled from "styled-components/native";
import Slide from "../../components/Slide";
import Poster from "../../components/Poster";
import { RefreshControl } from "react-native-gesture-handler";

const API_KEY="e5f029bbd9c262b50c9db4946609374f";

const Container = styled.ScrollView`
`;

const Loader = styled.View`
    flex: 1;
    justify-content: center;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const ListTitle = styled.Text`
    color:black;
    font-size:18px;
    font-weight: 600;
    margin-left: 20px;
    `;

const TrendingScroll = styled.ScrollView`
    margin-top:20px;
`;

const Movie = styled.View`
    margin-right:10px;
    align-items: center;
`;

const Title = styled.Text`
    color: black;
    font-weight: 600;
    margin-top: 7px;
    margin-bottom: 5px;
`;
const Votes = styled.Text`
    color: black;
    font-size:10px;
`;

const ListContainer = styled.View`
    margin-bottom:40px;
`;

const HMovie = styled.View`
    padding: 0px 30px;
    margin-bottom: 30px;
    flex-direction: row;
`;

const HColumn = styled.View`
    margin-left:15px;
`;

const Overview = styled.Text`
    opacity: 0.8;
    width: 25%;
`;

const Release = styled.Text`
    color: black;
    font-size: 12px;
    margin-vertical:10px;
`;

const ComingSoonTitle = styled(ListTitle)`
    margin-bottom: 30px;
`;

const Home: React.FC<NativeStackScreenProps<any, "Homes">> = () => {
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [nowPlaying, setNowPlaying] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [trending, setTrending] = useState([]);
    const getTrending = async() => {
        const {results} = await (
            await fetch(
            `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
        )
        ).json();
        setTrending(results);
    }
    const getUpcoming = async() => {
        const {results} = await (
            await fetch(
            `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=KR`
        )
        ).json();
        setUpcoming(results);
    }
    const getNowPlaying = async () => {
        const {results} = await (
            await fetch(
            `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`
        )
        ).json();
        setNowPlaying(results);
    };
    const getData = async () => {
        await Promise.all([getTrending(), getUpcoming(), getNowPlaying()])
        //wait for all of them
        setLoading(false);
    }
    useEffect(() => {
        getData();
    }, []);
    const onRefresh = async() => {
        setRefreshing(true);
        await getData();
        setRefreshing(false);
    }
    return loading ? (
        <Loader>
            <ActivityIndicator />
        </Loader>
    ) : (
        <Container
            refreshControl={
            <RefreshControl onRefresh={onRefresh} refreshing={refreshing}/>
            }
        >
            <Swiper
                loop
                timeout={3.5}
                controlsEnabled={false}
                containerStyle={{
                    marginBottom: 30, 
                    width: "100%", 
                    height: SCREEN_HEIGHT / 4 }}
                >
                {nowPlaying.map((movie) => <Slide key={movie.id}
                    backdropPath={movie.backdrop_path}
                    posterPath={movie.poster_path}
                    originalTitle={movie.original_title}
                    voteAverage={movie.vote_average}
                    overview={movie.overview}
                />)}        
            </Swiper>
            <ListContainer>
            <ListTitle>인기영화</ListTitle>
            <TrendingScroll 
                contentContainerStyle={{ paddingLeft: 20}}
                horizontal 
                showsHorizontalScrollIndicator={false}>
                    {trending.map((movie) => (
                    <Movie key={movie.id}>
                        <Poster path={movie.poster_path}/>
                        <Title>
                            {movie.original_title.slice(0, 13)}
                            {movie.original_title.length > 13 ? "..." : null}
                         </Title>
                        <Votes>    
                        {movie.vote_average > 0 ? 
                            `★ ${movie.vote_average}/10`
                            : `Coming soon`}
                        </Votes>
                        </Movie>
                    ))}
            </TrendingScroll>
            </ListContainer>
            <ComingSoonTitle>개봉예정영화</ComingSoonTitle>
            {upcoming.map((movie) => (
            <HMovie key={movie.id}>
                <Poster path={movie.poster_path} />
                <HColumn>
                    <Title>
                        {movie.original_title}
                    </Title>
                    <Release>
                        {new Date(movie.release_date).toLocaleDateString("ko", {month:"long", day:"numeric", year:"numeric"})}
                    </Release>
                    <Overview>{
                    movie.overview !== "" && movie.overview.length > 80 
                    ? `${movie.overview.slice(0, 140)}...` 
                    : movie.overview}
                    </Overview>
                </HColumn>
            </HMovie>
            ))}
        </Container>
    );
};

export default Home;
