// import ReactDOM from 'react-dom/client'
import { useState } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function EditPage() {
    const [inputValue, setInputValue] = useState('')

    const showSwal = () => {
        withReactContent(Swal).fire({
            title: <i>Input something</i>,
            input: 'text',
            inputValue,
            preConfirm: () => {
                setInputValue(Swal.getInput()?.value || '')
            },
        })
    }

    return (
        <div className='bg-gray-400 h-60 w-52'>
            <button className='bg-green-500 m-4' onClick={showSwal}>Show SweetAlert2 modal</button>
            <div>Your input: {inputValue}</div>
        </div>
    )
}

export default EditPage
