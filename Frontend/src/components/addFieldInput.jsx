import React, { useState } from 'react'
import { CgClose } from "react-icons/cg";

const AddFieldInput = ({ close,onChange,value,submit}) => {
  const [name, setName] = useState('')
  const [type, setType] = useState('')
  const [options, setOptions] = useState('')
  const [multiple, setMultiple] = useState(false)

  return (
    <section className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-5 relative">

        <CgClose
          onClick={close}
          className="absolute top-3 right-3 cursor-pointer text-xl"
        />

        <h2 className="text-lg font-semibold mb-4">Add New Field</h2>

        <input
          value={value}
          onChange={onChange}
          // onChange={(e)=>setName(e.target.value)}
          placeholder="Field name (e.g. Color, Warranty)"
          className="w-full mb-3 px-3 py-2 border rounded"
        />

        <button
          onClick={submit}
          // onClick={handleSubmit}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded"
        >
          Add Field
        </button>
      </div>
    </section>
  )
}

export default AddFieldInput
