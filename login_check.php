        if (!$this->session->userdata('logged_in')) {
            // If not logged in, redirect to login page
            redirect('users/login');
        }
