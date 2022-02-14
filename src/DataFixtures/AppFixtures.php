<?php

namespace App\DataFixtures;

use App\Entity\Player;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        // create 20 players
        for ($i = 0; $i < 20; $i++) {
            $player = new Player();
            $player->setName('joueur  ' . $i);
            $player->setPower(mt_rand(10, 100));
            $manager->persist($player);
        }

        $manager->flush();
    }
}
