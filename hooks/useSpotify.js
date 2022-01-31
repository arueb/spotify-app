
function useSpotify() {
    const { data: session, status } = useSession(); 
    return(
        useEffect(()=> {
            if (session)
        })
    )
}

export default useSpotify;