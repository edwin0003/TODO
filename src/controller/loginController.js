import { PrismaClient } from "@prisma/client";
import { compareSync } from "bcrypt";

const prisma = new PrismaClient();

export async function login({ body, session }, res) {
  const { email, password } = body;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (user) {
    const validate = compareSync(password, user.password);
    if (validate) {
      const profile = await prisma.profile.findUnique({
        where: {
          userId: user.id,
        },
      });

      session.user = {
        email: user.email,
        id: user.id,
        photo: profile ? profile.photo : "",
      };
      session.cookie.maxAge = 1000000;

      if (profile) {
        res.redirect("/admin/blogs");
      } else {
        res.redirect("/register");
      }
    } else {
      res.redirectFlash("/auth/login", {
        errorMessage: "contraseña o correo invalidos",
      });
    }
  } else {
    res.redirectFlash("/auth/login", {
      errorMessage: "contraseña o correo invalidos",
    });
  }
}

export function logout({ session }, res) {
  session.destroy();
  res.redirect("/");
}

export async function saveProfile(req, res) {
  const fileName = req.file.filename;
  const user = req.session.user;
  const { name, about } = req.body;
  await prisma.profile.create({
    data: { name: name, about: about, photo: fileName, userId: user.id },
  });
  res.render("auth/Register");
}