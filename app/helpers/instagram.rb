def instaclient
  Instagram.client(:access_token => session[:access_token])
end