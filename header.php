<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Google Forms</title>
    <link rel="stylesheet" href="https://bootswatch.com/3/flatly/bootstrap.min.css">
    <link rel="stylesheet" href="<?php echo base_url(); ?>assets/css/header_styles.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/1.11.3/css/dataTables.bootstrap.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <style>
        body {
            background-color: rgb(240, 235, 248);
            font-family: 'Roboto', sans-serif;
        }

        .navbar {
            background-color: rgb(103, 58, 183);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .navbar-brand,
        .navbar-nav > li > a,
        .navbar-text {
            color: #fff !important; /* Ensure text is white */
            transition: color 0.3s ease-in-out;
        }

        .navbar-brand:hover,
        .navbar-nav > li > a:hover,
        .navbar-text:hover {
            color: #d1c4e9 !important; /* Lighter shade on hover */
        }

        .fa {
            color: white; /* Ensure icons are white */
            transition: transform 0.3s ease-in-out;
        }

        .fa:hover {
            transform: scale(1.2);
        }

        .alert {
            opacity: 1;
            transition: opacity 0.6s;
        }

        .alert-fade-out {
            opacity: 0;
        }
    </style>
</head>

<body>
    <nav class="navbar navbar-inverse">
        <div class="container">
            <?php if ($this->session->userdata('logged_in')): ?>
            <div class="navbar-header">
                <a class="navbar-brand" href="<?php echo base_url(); ?>Form_controller/index_forms">Google Forms</a>
            </div>
            <?php endif; ?>
            <div id="navbar">
                <ul class="nav navbar-nav">
                    <li><a href="<?php echo base_url(); ?>home/index1">About</a></li>
                    <li><a href="<?php echo base_url(); ?>Publish_controller/list_user_published_forms">Published Forms</a></li>
                    <li><a href="<?php echo base_url(); ?>Response_submit/submit_form">Responses</a></li>
                </ul>
                <ul class="nav navbar-nav navbar-right">
                    <?php if (!$this->session->userdata('logged_in')): ?>
                    <li><a href="<?php echo base_url(); ?>users/login">Login</a></li>
                    <li><a href="<?php echo base_url(); ?>users/register">Register</a></li>
                    <?php endif; ?>
                    <?php if ($this->session->userdata('logged_in')): ?>
                    <li>
                        <p class="navbar-text">Welcome <?php echo $this->session->userdata('username'); ?> to Google Forms</p>
                    </li>
                    <li><a href="<?php echo base_url(); ?>home/title">Create Form</a></li>
                    <li><a href="<?php echo base_url(); ?>users/logout"><i class="fa fa-sign-out" aria-hidden="true"></i></a></li>
                    <?php endif; ?>
                </ul>
            </div>
        </div>
    </nav>
    <div class="container">
        <?php if ($this->session->flashdata('user_registered')): ?>
        <?php echo '<p class="alert alert-success">' . $this->session->flashdata('user_registered') . '</p>'; ?>
        <?php endif; ?>
        <?php if ($this->session->flashdata('login_failed')): ?>
        <?php echo '<p class="alert alert-danger">' . $this->session->flashdata('login_failed') . '</p>'; ?>
        <?php endif; ?>
        <?php if ($this->session->flashdata('user_loggedout')): ?>
        <?php echo '<p class="alert alert-success">' . $this->session->flashdata('user_loggedout') . '</p>'; ?>
        <?php endif; ?>
    </div>
    <script>
        $(document).ready(function () {
            setTimeout(function () {
                $('.alert').each(function () {
                    $(this).addClass('alert-fade-out');
                });
            }, 5000); // Adjust the time (5000ms = 5 seconds) as needed

            // Optional: remove alert elements from the DOM after fading out
            setTimeout(function () {
                $('.alert').each(function () {
                    $(this).remove();
                });
            }, 5600); // Adjust this time slightly longer than the fade out time
        });
    </script>
</body>

</html>
