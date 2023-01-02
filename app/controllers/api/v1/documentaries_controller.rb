module Api
  module V1
    class DocumentariesController < ApplicationController
      protect_from_forgery with: :null_session
      before_action :set_documentary, only: %i[ show ]
      before_action :destroy_documentary, only: %i[ update edit destroy ]
      before_action :documentary_params, only: %i[ create update ]

      # GET /documentaries or /documentaries.json
      def index
        @documentaries = Documentary.all
        render :json => @documentaries
      end

      # GET /documentaries/1 or /documentaries/1.json
      def show
        render json: @documentary
      end

      # GET /documentaries/new
      def new
        @documentary = Documentary.new
      end

      # GET /documentaries/1/edit
      def edit
      end

      # POST /documentaries or /documentaries.json
      def create
        @documentary = Documentary.new(documentary_params)

          if @documentary.save
            render json: @documentary, status: :created
          else
            render json: @documentary.errors, status: :unprocessable_entity 
          end

      end

      # PATCH/PUT /documentaries/1 or /documentaries/1.json
      def update
        respond_to do |format|
          if @documentary.update(documentary_params)
            format.html { redirect_to documentary_url(@documentary), notice: "Documentary was successfully updated." }
            format.json { render :show, status: :ok, location: @documentary }
          else
            format.html { render :edit, status: :unprocessable_entity }
            format.json { render json: @documentary.errors, status: :unprocessable_entity }
          end
        end
      end

      # DELETE /documentaries/1 or /documentaries/1.json
      def destroy
        @documentary.destroy
      end

      private
        # Use callbacks to share common setup or constraints between actions.
        def set_documentary
           @documentary = Documentary.find_by_book_name(params[:slug])
        end

        def destroy_documentary
          @documentary = Documentary.find_by_slug(params[:slug])
       end

        # Only allow a list of trusted parameters through.
        def documentary_params
          params.require(:documentary).permit(:documentary_name, :book_name, :slug, :views, :price, :book_id, :documentary_name)
        end
    end
  end
end
