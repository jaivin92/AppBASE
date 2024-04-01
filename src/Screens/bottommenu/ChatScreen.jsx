import { View, Text, FlatList, Image,} from 'react-native'
import React, { useEffect, useState } from "react";
import { myColors } from '../../Utils/MyColors'
import authFetch from '../../Data/API';

//const data = new Array(50).fill(0).map((_, index) => ({ id: index }))

const ChatScreen = () => {

  const [movie, setmovie] = useState([]);
  const [pages, setpage] = useState(1);
  const [paginationno, setpaginationno] = useState(0);

  const [showAlertMsg, hideAlertMsg] = useState(false);
  const [showToastMsg, hideToastMsg] = useState(false);

  const PopularMovie = async () => {
    try {
      const { data } = await authFetch.get(`/3/movie/popular?language=en-US&page=${pages}`);
      //console.log(data)
      //setmovie([]);
      setpaginationno(0);
      if (!movie.length > 0) {
        setmovie(data.results)
        console.log("1  > ", movie.length)
      } else {
        //const {}
        setmovie([...movie, ...data.results])
        console.log("2  > ", movie.length)
      }
      //setmovie([movie, ...data.results]);
      setpaginationno(data.total_pages)
      hideAlertMsg(false);
    } catch (error) {
      hideAlertMsg(true);
    }
  }

  const handleClick = (number) => {
    //console.log("scroll" + number)
    setpage(number);
  }

  useEffect(() => {
    PopularMovie();
  }, [pages])


  return (
    <View>
      {/* <Text>{movie.length}</Text> */}
      <FlatList
        data={movie}
        renderItem={({ item }) => {
          return (
            <View style={{
              flex: 1,
              flexDirection: 'column',
              height: 160,
              margin: 10,
              backgroundColor: myColors.darkblue,
              borderRadius: 30,
              justifyContent: 'center',
              elevation : 10

            }}>

              {/* <Text style={{ alignSelf: 'center', color: myColors.secondary }}>{`https://image.tmdb.org/t/p/w300${item.poster_path}`}</Text> */}
              {/* <Image src={`https://image.tmdb.org/t/p/w300${item.poster_path}` } alt={item.name} /> */}
              {/* <Image source={{uri :'https://image.tmdb.org/t/p/w300/qhb1qOilapbapxWQn9jtRCMwXJF.jpg'}} style={{width : 100, height : 100}} /> */}
              <Image 
              source={{ uri: `https://image.tmdb.org/t/p/w300${item.poster_path}` }} 
              style={{ 
                width: '100%', 
                height: '100%', 
                borderRadius: 30,
                 }} />
            </View>
          );
        }}
        //        numColumns={5}
        numColumns={2}
        keyExtractor={(item, index) => index}
        //onViewableItemsChanged={()=>{handleClick(pages+1)}}
        onEndReachedThreshold={0.2}
        onEndReached={() => { handleClick(pages + 1) }}
      />
    </View>
  )
}

export default ChatScreen