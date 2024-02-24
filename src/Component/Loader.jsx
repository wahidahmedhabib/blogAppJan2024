import CircleLoader from "react-spinners/CircleLoader";


function Loader({ size }) {
    return (
        <div className="sweet-loading h-[100%] flex justify-center items-center ">
            <CircleLoader
                color={'blue'}
                size={size}
            />
        </div>
    );
}

export default Loader;