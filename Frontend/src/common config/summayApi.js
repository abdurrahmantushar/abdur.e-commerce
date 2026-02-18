
export const BaseUrl= import.meta.env.VITE_API_URL

export const SummaryApi={
    register : {
        url  :'api/user/register',
        method: 'post'
    },
    login :{
        url : "api/user/login",
        method : 'post'
    },
    forgot_password: {
        url : "/api/user/forgot-password",
        method : "put"
    },
    verify_forgot_otp:{
        url : "api/user/verify-forgot-otp",
        method : "put"
    },
    reset_password:{
        url :"api/user/reset-password",
        method: "put"
    },
    refreshToken :{
        url : "api/user/refresh-token",
        method : "post"
    },
    userDetails:{
        url :"api/user/user-details",
        method : "get"
    },
    logout:{
        url : "api/user/logout",
        method : "get"
    },
    update_userDetails:{
        url:'api/user/update-user',
        method:'put'
    },
    upload_avatar :{
        url: 'api/user/upload-avatar',
        method:'put'
    },
    addCategory : {
        url: '/api/category/add-category',
        method : 'post'
    },
    uploadImage :{
        url : '/api/file/upload',
        method: 'post'
    },
    getCategory:{
        url : '/api/category/get',
        method: 'get'
    },
    updateCategory: {
        url : '/api/category/update',
        method : 'put'
    },
    deleteCategory: {
        url : '/api/category/delete',
        method : 'delete'
    },
    createSubCategory :{
        url : '/api/sub-category/create',
        method : 'post'
    },
    getSubCategory :{
        url : "/api/sub-category/get",
        method : 'get'
    },
    updateSubCategory: {
        url : '/api/sub-category/update',
        method : 'put'
    },
    deleteSubCategory : {
        url : '/api/sub-category/delete',
        method : 'delete'
    },
    createProudct : {
        url : '/api/product/create',
        method : 'post'
    },
    getProduct :{
        url :'/api/product/get',
        method : "post"
    },
    deleteProduct : {
        url : '/api/product/delete',
        method : 'delete'
    },
    updateProduct : {
        url : '/api/product/update',
        method : 'put'
    },
    getProductByCategory : {
        url : '/api/product/get-product-by-category',
        method : 'post'
    },
    getproductByCategoryAndsubCategory : {
        url : '/api/product/get-product-by-category-and-subCategory',
        method : 'post'
    },
    getproductAndSubCategoryByCategory : {
        url : '/api/product/get-product-and-subCategory-by-category',
        method : 'post'
    },
    getSingleProductDetails : {
        url : '/api/product/get-product-details',
        method : 'post'
    },
    getSeachProduct : {
        url : '/api/product/search-products',
        method : 'post'
    },
    addToCart : {
        url : '/api/cart/create',
        method : 'post'
    },
    getCardDetails : {
        url : '/api/cart/get',
        method : 'get'
    },
    updateCartQuentity : {
        url : '/api/cart/update',
        method : 'put'
    },
    deleteCartItem : {
        url : '/api/cart/delete/cart-item',
        method : 'delete'
    },
    createAddress : {
        url : '/api/address/create',
        method : 'post'
    },
    getAddress : {
        url : '/api/address/get-address',
        method : 'get'
    },
    updateAddress : {
        url : '/api/address/update-address',
        method : 'put'
    },
    deleteAddress : {
        url : '/api/address/delete-address',
        method : 'delete'
    },
    cashOnDelivery : {
        url : '/api/order/cash-on-delivery',
        method : 'post'
    },
    payment_url : {
        url : '/api/order/checkout',
        method : 'post'
    },
    getOrderDetails : {
        url :'/api/order/order-list',
        method : 'get'
    },
    markAsSeen: (orderId) => ({
    url: `/api/order/mark-seen/${orderId}`,
    method: 'put'
    }),
    updateOrder : (orderId) => ({
        url :`/api/order/update/${orderId}`,
        method : 'put'
    }),
    uploadBanner : {
        url : '/api/file/banner-upload',
        method : 'put',
    },
    getBanner : {
        url : '/api/file/get-banner',
        method : 'get'
    },
    uploadMobileBanner : {
        url :'/api/file/banner-mobile-upload',
        method : 'put'
    },
    getMObileBanner : {
        url : '/api/file/get-mobile-banner',
        method : 'get'
    }
}