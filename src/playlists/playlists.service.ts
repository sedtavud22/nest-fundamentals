import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Playlist } from './playlist.entity';
import { In, Repository } from 'typeorm';
import { Song } from 'src/songs/songs.entity';
import { User } from 'src/users/user.entity';
import { CreatePlaylistDTO } from './dto/create-playlist.dto';

@Injectable()
export class PlaylistsService {
  constructor(
    @InjectRepository(Playlist)
    private playlistRepo: Repository<Playlist>,

    @InjectRepository(Song)
    private songsRepo: Repository<Song>,

    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async create(playlistDTO: CreatePlaylistDTO): Promise<Playlist> {
    const playlist = new Playlist();
    playlist.name = playlistDTO.name;

    const songs = await this.songsRepo.findBy({ id: In(playlistDTO.songs) });
    playlist.songs = songs;

    const user = await this.userRepo.findOneBy({ id: playlistDTO.user });
    playlist.user = user;

    return this.playlistRepo.save(playlist);
  }
}
