import React from 'react';
import {
  Avatar,
  Button,
  Card, Container, Divider, Input, Loading, Row, Spacer, Text,
} from '@nextui-org/react';
import { FcGoogle } from 'react-icons/fc';
import { BsGithub } from 'react-icons/bs';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import jwtDecode from 'jwt-decode';

import Seo from '../components/Seo/Seo';
import { signin, SigninType } from '../services/auth.service';
import useUser from '../zustand/useUser';

type LocationProps = {
  state: {
    message: string,
    from: {
      pathname: string
    }
  }
}

const Signin: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation() as LocationProps;
  const { setUser } = useUser();

  const {
    register, handleSubmit, formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = async (data): Promise<void> => {
    try {
      const { token } = await signin(data as SigninType);
      localStorage.setItem('token', token);

      // parse token
      const userDecode = jwtDecode(token);

      setUser(userDecode);

      navigate(state?.from?.pathname || '/projects');
    } catch (err) {
      toast.error('Login failed, email or password is wrong');
    }
  };

  return (
    <Container md>
      <Seo
        title="Signin - Create API"
      />
      <Row justify="center" css={{ alignItems: 'center', minHeight: '100vh' }}>
        <Card css={{ maxWidth: '450px', px: '$8', py: '$16' }}>
          <Row justify="center">
            <Avatar
              src="https://www.freepnglogos.com/uploads/logo-tokopedia-png/logo-tokopedia-15.png"
              size="xl"
            />
          </Row>
          <Spacer y={2} />
          <Text h3>Sign In</Text>
          <Spacer y={2} />
          {state?.message && (
            <>
              <Card color="warning">
                {state.message}
              </Card>
              <Spacer y={2} />
            </>
          )}
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input type="email" css={{ width: 'stretch' }} labelPlaceholder="Email" {...register('email', { required: true })} />
            {errors.email?.type === 'required' && <Text css={{ color: '$red400' }}>Email is required</Text>}

            <Spacer y={2} />

            <Input.Password css={{ width: 'stretch' }} labelPlaceholder="Password" {...register('password', { required: true })} />
            {errors.password?.type === 'required' && <Text css={{ color: '$red400' }}>Password is required</Text>}

            <Spacer y={2} />

            <Button type="submit" css={{ width: 'stretch', mb: '1em' }} disabled={isSubmitting}>
              {isSubmitting
                ? <Loading type="points" color="white" />
                : 'Sign In'}
            </Button>
            <Text>
              Didn't have an account ?
              {' '}
              <Link to="/signup">Sign Up</Link>
            </Text>
          </form>
          <Divider css={{ my: '$8' }} />
          <Text css={{ textAlign: 'center' }}>Or Sign In With</Text>
          <Spacer y={1} />
          <Button ghost borderWeight="light" disabled>
            <FcGoogle size="1.3rem" style={{ marginRight: '0.5em' }} />
            Sign In with Google
          </Button>
          <Spacer y={0.3} />
          <Button ghost borderWeight="light" disabled>
            <BsGithub size="1.3rem" style={{ marginRight: '0.5em' }} />
            Sign In with Github
          </Button>
        </Card>
      </Row>
    </Container>
  );
};

export default Signin;
