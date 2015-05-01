post '/order' do
  order = Order.create

  params[:photos].each do |photo_data|
    order.photos << Photo.create(photo_data)
  end

  redirect '/order/' + order.id
end

get '/order/:id' do |id|
  @order = Order.find(id)
  erb :'order/show'
end