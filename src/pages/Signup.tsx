import React, { useState } from 'react';
import {
  Button,
  Card, Container, Divider, Image, Input, Loading, Row, Spacer, Text,
} from '@nextui-org/react';
import { FcGoogle } from 'react-icons/fc';
import { BsGithub } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import jwtDecode from 'jwt-decode';

import Seo from '../components/Seo/Seo';
import { signup, SignupType } from '../services/auth.service';
import useUser from '../zustand/useUser';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register, handleSubmit, watch, formState: { errors },
  } = useForm();
  const password = watch('password', '');

  const onSubmit: SubmitHandler<FieldValues> = async (data): Promise<void> => {
    try {
      setIsLoading(true);
      const { token } = await signup(data as SignupType);
      localStorage.setItem('token', token);
      // parse token
      const userDecode = jwtDecode(token);

      setUser(userDecode);

      navigate('/');
    } catch (err: any) {
      toast.error(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container md>
      <Seo
        title="Signup - Create API"
      />
      <Row justify="center" css={{ alignItems: 'center', minHeight: '100vh' }}>
        <Card css={{ maxWidth: '450px', px: '$8', py: '$16' }}>
          <Row justify="center">
            <Link to="/">
              <Image
                src="/logo/logohorizontal.svg"
              />
            </Link>
          </Row>
          <Spacer y={2} />
          <Text h3>Sign Up</Text>
          <Spacer y={1} />
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              type="name"
              css={{ width: 'stretch' }}
              placeholder="Name"
              {...register('name', { required: true, minLength: 3, maxLength: 50 })}
            />
            {errors.name?.type === 'required' && <Text css={{ color: '$red400' }}>Name is required</Text>}
            {errors.name?.type === 'minLength' && <Text css={{ color: '$red400' }}>Minimal is 3 character</Text>}
            {errors.name?.type === 'maxLength' && <Text css={{ color: '$red400' }}>Maxmimal is 50 character</Text>}

            <Spacer y={1} />

            <Input type="email" css={{ width: 'stretch' }} placeholder="Email" {...register('email', { required: true })} />
            {errors.email?.type === 'required' && <Text css={{ color: '$red400' }}>Email is required</Text>}

            <Spacer y={1} />

            <Input.Password
              css={{ width: 'stretch' }}
              placeholder="Password"
              {...register('password', {
                required: true,
                minLength: 6,
              })}
            />
            {errors.password?.type === 'required' && <Text css={{ color: '$red400' }}>Password is required</Text>}
            {errors.password?.type === 'minLength' && <Text css={{ color: '$red400' }}>Password min 6 character</Text>}

            <Spacer y={1} />

            <Input.Password
              css={{ width: 'stretch' }}
              placeholder="Retype Password"
              {...register('retypePassword', {
                required: true,
                validate(value: string) {
                  return value === password;
                },
              })}
            />
            {errors.retypePassword && <Text css={{ color: '$red400' }}>Password doesn't match</Text>}

            <Spacer y={1} />

            <Button type="submit" css={{ width: 'stretch', mb: '1em' }} disabled={isLoading}>
              {isLoading ? <Loading type="points" color="white" /> : 'Sign Up'}
            </Button>

            <Text>
              Already have an account ?
              {' '}
              <Link to="/signin">Sign In</Link>
            </Text>
          </form>
          <Divider css={{ my: '$8' }} />
          <Text css={{ textAlign: 'center' }}>Or Sign Up With</Text>
          <Spacer y={1} />
          <Button
            ghost
            borderWeight="light"
            disabled
          >
            <FcGoogle size="1.3rem" style={{ marginRight: '0.5em' }} />
            Sign Up with Google
          </Button>
          <Spacer y={0.3} />
          <Button ghost borderWeight="light" disabled>
            <BsGithub size="1.3rem" style={{ marginRight: '0.5em' }} />
            Sign Up with Github
          </Button>
        </Card>
      </Row>
    </Container>
  );
};

export default Signup;
