import express, {type Request, type Response } from 'express';
import { PrismaClient } from '@prisma/client'
import cors from 'cors'

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors())

app.get('/users', async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.post('/users', async (req: Request, res: Response) => {
  const { name, email } = req.body;

  try {
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
      },
    });
    res.status(201).json({mensagem: "usuário cadastro com sucesso!"});
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar usuário. Talvez o email já exista.' });
  }
});

app.delete('/users/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string)
  try{
    const response = await prisma.user.delete({
      where: {
        id: id,
      }
    })
    res.json({mensagem: 'Usuário deletado com sucesso!'})
  }
  catch(error){
    res.status(400).json({error: 'Erro ao tentar deletar usuário'})
  }

})

app.patch('/users/:id', async (req: Request, res: Response) => {
  const id= parseInt(req.params.id as string)
  try{
    const response = await prisma.user.update({
      where: {
        id:id
      },
      data: req.body
    })
    res.json({mensagem: "Usuário atualizado com sucesso!"})
  }
  catch(error){
    res.status(400).json({error: 'Erro ao tentar atualizar usuario'})
  }
})


app.listen(3000, () => {
  console.log(`Servidor rodando em http://localhost:3000/`);
});