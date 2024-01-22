import { useEffect, useState } from "react";
// import { ShimmerSimpleGallery } from "react-shimmer-effects";
import './App.css';

const Users = () => {
    const [userList, setUserList] = useState([]);
    const [search, setSearch] = useState('');
    const [filterList, setFilterList] = useState([]);
    const [selectList, setSelectList] = useState([]);

    useEffect(() => {

        (async () => {
        const results = await fetch("https://jsonplaceholder.typicode.com/users");
        const parsedResult = await results.json();
        console.log(parsedResult);
        setUserList(parsedResult);
    }
        )(),
        [];
    },[]);
    
    const changeHandler = (e) => {
        setSearch(e.target.value);
        console.log("search", search);

        const res = userList.filter( 
            (user) => user.name.toLowerCase().includes(search.toLowerCase()) 
            );

      setFilterList(res);

        console.log("Filtered List");
            console.log(filterList);
    }

    const addHandler = (e) => {
        const select = e.target.name;
        console.log("select",select);
        // const finder = userList.find(
        //     (user) => user.name.toLowerCase().includes(select.value.toLowerCase())
        // );
        const arr  = selectList;
        //setSelectList((prevState) => {...prevState, select})
        //setSelectList( [...arr, select]);
        const finder = selectList.find(
                (user) => user.toLowerCase().includes(select.toLowerCase())
            );
            if(finder){

                console.log("cant display warning");

            }
            else{
                setSelectList( [...arr, select]);
            }
    }

    const chipRemoveHandler = (e) => {
            const rm_item = e.target.name;
            console.log("item to remove", rm_item);
            const arr = selectList;
           
            console.log("removeChip triggered");
          const arr2 =  arr.filter(
                (item) => item !== rm_item
            );
            //setSelectList((prevState) = prevState.filter((item) => item != rm_item))
            setSelectList(arr2);

    }
    console.log("selectList" ,selectList);


    return (
        <>
       
        <div className="searchbar-container" >
            {/* <p className ="chips">Hi <button className="chip-remove"> x</button></p> */}
            {/* <p className ="chips">Leanne x</p>  */}
            {selectList.map(
                (selectItem) => {
                    return (
                    <>
                        <p className="chips">
                            {selectItem}
                            <button className="chip-remove" name={selectItem} onClick = {chipRemoveHandler}>x</button>
                        </p>
                    </>
                     )                     
                })}
            
            <input 
                className = "searchBar"
                type="text" 
                onChange = {changeHandler} 

                placeholder = ""
                value = {search} />

        </div>
            
            
            <ul>
            {filterList.map( 
                (filterItem) => {
                return (
                    <>    
                        <button className="suggestion-container"  key={filterItem.id} name = {filterItem.name} onClick = {addHandler}>
                             
                                {filterItem.name}
                                
                        </button>
                    </>
                    );
                }
            )}
            </ul>
        </>
    )

    



};

export default Users;