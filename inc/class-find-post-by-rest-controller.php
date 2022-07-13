<?php

namespace Wiley\Symlinks;

use WP_Query;
use WP_REST_Controller;
use WP_REST_Server;
use WP_REST_Posts_Controller;

class Find_Post_By_REST_Controller extends WP_REST_Controller {

	/**
	 * Constructor.
	 */
	public function __construct() {
		$this->namespace = 'wiley/v1';
		$this->rest_base = 'find-post-by';
	}

	/**
	 * Registers the routes for the objects of the controller.
	 *
	 * @see register_rest_route()
	 */
	public function register_routes() {
		// find post by id
		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base . '/id/(?P<id>[0-9]+)',
			array(
				array(
					'methods'             => WP_REST_Server::READABLE,
					'callback'            => array( $this, 'find_icon_by_id' ),
					'permission_callback' => array( $this, 'find_post_permission_check' ),
					'args'                => $this->get_collection_params(),
				),
			)
		);
	}

	/**
	 * Checks if a given request has access to search content.
	 *
	 *
	 * @param WP_REST_Request $request Full details about the request.
	 * @return true|WP_Error True if the request has search access, WP_Error object otherwise.
	 */
	public function find_post_permission_check( $request ) {
		// return current_user_can( 'edit_posts' );
		return true;
	}

	public function get_collection_params() {
		$query_params = parent::get_collection_params();

		$query_params['id'] = array(
			'description' => __( 'Post ID to look up.' ),
			'type'        => 'number',
		);

		return $query_params;
	}

	/**
	 * Retrieves a collection of icons.
	 *
	 * @param WP_REST_Request $request Full details about the request.
	 * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
	 */
	public function find_icon_by_id( $request ) {
		$id = $request->get_param( 'id' );

		$post_object = get_post( $id );

		$response = array();

		if ( $post_object ) {
			$posts_controller = new WP_REST_Posts_Controller( $post_object->post_type );
			$data             = $posts_controller->prepare_item_for_response( $post_object, $request );
			$response         = rest_ensure_response( $data );
		} else {
			$response = array(
				'code'    => 'rest_icon_not_found',
				'message' => 'Icon file not found.',
				'data'    => array( 'status' => 404 ),
			);
		}
			return $response;
	}
}
