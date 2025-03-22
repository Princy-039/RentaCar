import { useState, useEffect } from 'react';
import { Card, CardBody, Form, FormGroup, Label, Input, Button } from 'reactstrap';

const Settings = () => {
  const [password, setPassword] = useState('');
  const [contactInfo, setContactInfo] = useState({
    email: '',
    phone: '',
  });
  const [message, setMessage] = useState('');

  // ✅ Fetch admin data on component mount
  useEffect(() => {
    const fetchAdminDetails = async () => {
      try {
        const response = await fetch('http://localhost:3000/users/admin/details'); // Change backend URL as needed
        const data = await response.json();

        if (response.ok) {
          setContactInfo({
            email: data.admin.email || '',
            phone: data.admin.phone || '',
          });
          console.log('Fetched Admin:', data.admin);
        } else {
          setMessage(data.error || 'Failed to fetch admin details');
        }
      } catch (error) {
        console.error('Error fetching admin details:', error);
        setMessage('Server error. Please try again later.');
      }
    };

    fetchAdminDetails(); // Call function
  }, []); // Empty dependency array to call once when mounted

  // ✅ Handle password input
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // ✅ Handle email/phone input
  const handleContactInfoChange = (e) => {
    const { name, value } = e.target;
    setContactInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // ✅ Save admin settings (PUT API)
  const handleSaveSettings = async () => {
    try {
      const response = await fetch('http://localhost:3000/users/admin/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: contactInfo.email,
          password: password,
          phone: contactInfo.phone,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Settings updated successfully!');
        console.log('Updated Admin:', data.admin);
      } else {
        setMessage(data.error || 'Failed to update settings');
      }
    } catch (error) {
      console.error('Error updating settings:', error);
      setMessage('Server error. Please try again later.');
    }
  };

  return (
    <div className="container my-4">
      <Card className="shadow-sm p-3 mb-4">
        <CardBody>
          <h2 className="text-center mb-4">Settings</h2>
          <Form>
            <FormGroup>
              <Label for="password">Change Password</Label>
              <Input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Enter new password"
              />
            </FormGroup>
            <FormGroup>
              <Label for="email">Contact Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={contactInfo.email}
                onChange={handleContactInfoChange}
                placeholder="Enter contact email"
              />
            </FormGroup>
            <FormGroup>
              <Label for="phone">Contact Phone</Label>
              <Input
                type="text"
                id="phone"
                name="phone"
                value={contactInfo.phone}
                onChange={handleContactInfoChange}
                placeholder="Enter contact phone"
              />
            </FormGroup>
            <Button color="primary" onClick={handleSaveSettings}>
              Save Settings
            </Button>
            {message && (
              <div className="mt-3 alert alert-info" role="alert">
                {message}
              </div>
            )}
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default Settings;
