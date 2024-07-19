<body>
<script>
    var base_url = '<?php echo base_url(); ?>';
    var form_title = '<?php echo $form_title; ?>'; // Add this line to get form title
</script>


    <div class="container">
        <div class="form-header">
            <button id="preview-btn" class="btn btn-info"><i class="fas fa-eye"></i></button>
            <h2 id="form-title">form_title</h2> <!-- Update this line to use the form title -->
            <button id="add-section-btn" class="btn btn-primary">+</button>
        </div>
        <div id="form-container"></div>

        <button id="submit-btn" class="btn btn-success" style="margin-left: 240px; margin-top: 20px">Submit</button>

    </div>
<!-in the frontend model-  -->

       public function getFormById($form_id)
        {
            $query = $this->db->get_where('forms', ['id' => $form_id]);
            return $query->row_array();
        }

<!in form controller--  -->

  public function index_forms($form_id = null)
    {
        // Check if the user is logged in
        if (!$this->session->userdata('logged_in')) {
            // If not logged in, redirect to login page
            redirect('users/login');
        }

        // Retrieve form title from the forms table using form_id
        $form_title = 'Untitled Form'; // Default title
        if ($form_id) {
            $form = $this->Frontend_model->getFormById($form_id);
            if ($form) {
                $form_title = $form['title'];
            }
        }

        // Load views and data if user is logged in
        $this->load->view('Frontend/header');

        $data = $this->Frontend_model->getforms();
        $this->load->view('Tables/list_forms', ['forms' => $data, 'form_title' => $form_title]);

        $this->load->view('Frontend/footer');
    }
