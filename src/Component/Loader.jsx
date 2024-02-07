import CircleLoader from "react-spinners/CircleLoader";


function Loader() {
    return (
        <div className="sweet-loading h-[100%] flex justify-center items-center ">

            <CircleLoader
                color={'blue'}
                // className="h- 10 w- 14 block my -0 m x-auto  "
                size={120}
            />
        </div>
    );
}

export default Loader;