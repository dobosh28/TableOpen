class Api::RestaurantsController < ApplicationController

    def index
        @restaurants = Restaurant.all
        render :index
    end

    def show
        @restaurant = Restaurant.find(params[:id])
        render :show
    end

    private

    def restaurant_params
        params.require(:restaurant).permit(
            :name, 
            :cross_street, 
            :neighborhood, 
            :hours_of_operation, 
            :cuisines, 
            :dining_style, 
            :dress_code, 
            :parking_details, 
            :payment_options, 
            :website, 
            :address, 
            :phone_number, 
            :cost, 
            :description
        )
    end
end