get '/gallery' do
  client = instaclient
  @user = client.user

  erb :gallery
end

get '/user/photos' do
  client = instaclient

  media = client.user_recent_media({max_id: params[:next_max_id]})
  return {images: media, next_max_id: media.pagination.next_max_id}.to_json
end