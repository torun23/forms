<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class New_form_controller extends CI_Controller {

    public function submit_form() {
        // Decode the formData from the POST request
        $formData = $this->input->post('formData');

        // Check if form_id is set in session
        $formId = $this->session->userdata('form_id');
        if ($formId) {
            // Load the model and save form data
            $this->load->model('new_form_model');
            $saveStatus = $this->new_form_model->save_form_data($formId, $formData);

            if ($saveStatus) {
                echo json_encode(['status' => 'success', 'message' => 'Form data submitted successfully']);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Failed to save form data']);
            }
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Form ID not found in session']);
        }
    }
}
?>
