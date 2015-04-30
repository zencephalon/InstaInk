get '/gallery' do
  client = Instagram.client(:access_token => session[:access_token])
  @user = client.user

  erb :gallery
end