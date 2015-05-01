get '/login' do
  erb :login
end

post '/login' do
  user = User.find_by(name: params[:name])
  if user && user.authenticate(params[:password])
    session[:user_id] = user.id
    redirect '/admin'
  else
    redirect '/login'
  end
end