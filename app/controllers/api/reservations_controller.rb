class ReservationsController < ApplicationController
  before_action :set_reservation, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user!, except: [:new, :create]

  def new
    if current_user
      @reservation = Reservation.new(
        party_size: params[:party_size],
        date: params[:date],
        time: params[:time],
        user_id: current_user.id
      )
    else
      @reservation = Reservation.new(
        party_size: params[:party_size],
        date: params[:date],
        time: params[:time]
      )
    end
  end

  def create
    @reservation = Reservation.new(reservation_params)
    @reservation.user = current_user if current_user

    if current_user.nil?
      if @reservation.valid?([:first_name, :last_name, :email, :phone_number, :occasion])
        @reservation.save
        render :show
      else
        render :new
      end
    else
      if @reservation.save
        render :show
      else
        render :new
      end
    end
  end

  def show
    @reservation = Reservation.find(params[:id])
  end

  def edit
    @reservation = Reservation.find(params[:id])
  end

  def update
    if @reservation.update(reservation_params)
      redirect_to @reservation, notice: 'Reservation was successfully updated.'
    else
      render :edit
    end
  end

  def destroy
    @reservation.destroy
    redirect_to reservations_url, notice: 'Reservation was successfully destroyed.'
  end

  private

  def set_reservation
    @reservation = Reservation.find(params[:id])
  end

  def reservation_params
    params.require(:reservation).permit(:restaurant_id, :user_id, :first_name, :last_name, :phone_number, :email, :occasion, :special_request, :party_size, :date, :time)
  end
end
