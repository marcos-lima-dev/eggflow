import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, password, rememberMe } = await request.json();

    // Validação de exemplo (substitua pela sua lógica real)
    if (email === 'gerente@eggflow.agri' && password === '123456') {
      const user = {
        id: '1',
        name: 'Gerente Avícola',
        email: 'gerente@eggflow.agri',
        role: 'gerente',
      };

      // Gera um token (simples, mas você pode usar JWT)
      const token = Buffer.from(`${email}:${Date.now()}`).toString('base64');

      // Cria a resposta com os dados do usuário
      const response = NextResponse.json({ user, token });

      // Define o cookie httpOnly (seguro, não acessível via JavaScript)
      // Se "rememberMe" for true, o cookie dura 30 dias; senão, dura apenas a sessão (sem maxAge)
      const maxAge = rememberMe ? 60 * 60 * 24 * 30 : undefined; // 30 dias ou sessão
      response.cookies.set('eggflow_session', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge,
      });

      return response;
    }

    return NextResponse.json(
      { message: 'E-mail ou senha inválidos' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Erro interno no servidor' },
      { status: 500 }
    );
  }
}