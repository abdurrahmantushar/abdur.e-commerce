import React, { useState, useEffect } from 'react'
import { CgClose } from 'react-icons/cg'
import { toast } from 'react-toastify'
import { Axios } from '../common config/axiox'
import { SummaryApi } from '../common config/summayApi'
import { AxiosToastError } from '../common config/axiosToastEross'

function UploadBanner({ close }) {
  const [loading, setLoading] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [imageUrl, setImageUrl] = useState("")

  // Fetch current banner
  const getBanner = async () => {
    try {
      const res = await Axios({ ...SummaryApi.getBanner })
      if (res.data.success && res.data.data) {
        setImageUrl(res.data.data.image)
      }
    } catch (error) {
      console.log('Banner fetch error')
    }
  }

  useEffect(() => {
    getBanner()
  }, [])

  // Upload to cloud (preview)
  const handleUploadBanner = async () => {
    if (!imageFile) {
      toast.error("Choose an image first")
      return
    }
    const formData = new FormData()
    formData.append('image', imageFile)

    try {
      setLoading(true)
      const res = await Axios({
        ...SummaryApi.uploadBanner,
        data: formData
      })
      const { data: resData } = res
      setImageUrl(resData.data.image)
      toast.success("Banner uploaded for preview")
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  // Save/update to database
  const handleSaveBanner = async () => {
    if (!imageUrl) {
      toast.error("Upload banner first")
      return
    }
    try {
      setLoading(true)
      const res = await Axios({
        ...SummaryApi.uploadBanner,
        data: { imageUrl }
      })
      if (res.data.success) {
        toast.success("Banner Updated Successfully 🎉")
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="fixed inset-0 bg-gray-900/50 flex items-center justify-center z-50">
      <div className="max-w-lg w-full bg-white rounded-xl p-6 shadow-lg relative"> 
        {/* Close button */}
        {close && (
          <CgClose
            onClick={close}
            className="absolute  top-4 right-4 text-red-600 hover:text-red-800 w-10 h-10 cursor-pointer"
          />
        )}

        {/* Preview */}
        <div className="w-full h-48 bg-gray-100 rounded-xl mb-4 overflow-hidden flex items-center justify-center">
          {imageUrl ? (
            <img
              src={`${imageUrl}?t=${Date.now()}`}
              alt="Banner"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-gray-400">No Banner Uploaded</span>
          )}
        </div>

        {loading && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white font-medium">
            Processing...
          </div>
        )}

        {/* Upload Input */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          id="banner-upload"
          className="hidden"
        />
        <label
          htmlFor="banner-upload"
          className="block bg-blue-600 hover:bg-blue-700 text-white text-center py-2 rounded-lg cursor-pointer mb-3"
        >
          Choose File
        </label>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleUploadBanner}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
          >
            Upload
          </button>
          <button
            onClick={handleSaveBanner}
            className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white py-2 rounded-lg"
          >
            Save
          </button>
        </div>
      </div>
    </section>
  )
}

export default UploadBanner
