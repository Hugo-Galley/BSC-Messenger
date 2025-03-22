from typing import List

from sqlalchemy import CHAR, Date, ForeignKeyConstraint, Index, String, Text
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
import datetime

class Base(DeclarativeBase):
    pass


class Users(Base):
    __tablename__ = 'Users'
    __table_args__ = (
        Index('username', 'username', unique=True),
    )

    id_user: Mapped[str] = mapped_column(CHAR(36), primary_key=True)
    username: Mapped[str] = mapped_column(String(255))
    password: Mapped[str] = mapped_column(Text)
    public_key: Mapped[str] = mapped_column(Text)
    salt: Mapped[str] = mapped_column(String(28)),
    icon: Mapped[str] = mapped_column(String(255))

    Conversation: Mapped[List['Conversation']] = relationship('Conversation', foreign_keys='[Conversation.id_user1]', back_populates='Users_')
    Conversation_: Mapped[List['Conversation']] = relationship('Conversation', foreign_keys='[Conversation.id_user2]', back_populates='Users1')
    Messages: Mapped[List['Messages']] = relationship('Messages', back_populates='Users_')


class Conversation(Base):
    __tablename__ = 'Conversation'
    __table_args__ = (
        ForeignKeyConstraint(['id_user1'], ['Users.id_user'], ondelete='CASCADE', name='conversation_ibfk_1'),
        ForeignKeyConstraint(['id_user2'], ['Users.id_user'], ondelete='CASCADE', name='conversation_ibfk_2'),
        Index('id_user1', 'id_user1'),
        Index('id_user2', 'id_user2')
    )

    id_conversation: Mapped[str] = mapped_column(CHAR(36), primary_key=True)
    id_user1: Mapped[str] = mapped_column(CHAR(36))
    id_user2: Mapped[str] = mapped_column(CHAR(36))
    icon: Mapped[str] = mapped_column(Text)

    Users_: Mapped['Users'] = relationship('Users', foreign_keys=[id_user1], back_populates='Conversation')
    Users1: Mapped['Users'] = relationship('Users', foreign_keys=[id_user2], back_populates='Conversation_')
    Messages: Mapped[List['Messages']] = relationship('Messages', back_populates='Conversation_')


class Messages(Base):
    __tablename__ = 'Messages'
    __table_args__ = (
        ForeignKeyConstraint(['id_conversation'], ['Conversation.id_conversation'], ondelete='CASCADE', name='messages_ibfk_2'),
        ForeignKeyConstraint(['id_receiver'], ['Users.id_user'], ondelete='CASCADE', name='messages_ibfk_1'),
        Index('id_conversation', 'id_conversation'),
        Index('id_receiver', 'id_receiver')
    )

    id_message: Mapped[str] = mapped_column(CHAR(36), primary_key=True)
    content: Mapped[str] = mapped_column(Text)
    id_receiver: Mapped[str] = mapped_column(CHAR(36))
    sendAt: Mapped[datetime.date] = mapped_column(Date)
    id_conversation: Mapped[str] = mapped_column(CHAR(36))

    Conversation_: Mapped['Conversation'] = relationship('Conversation', back_populates='Messages')
    Users_: Mapped['Users'] = relationship('Users', back_populates='Messages')
