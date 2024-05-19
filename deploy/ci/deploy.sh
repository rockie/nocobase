pwd

sudo mv -y ./admin-base.conf /etc/nginx/sites-available/admin-base.conf

mkdir -p ~/deploy/tmp

sudo tar -xzf ../artifacts/admin-base.tar.gz -C ~/deploy/tmp
ls -la ~/deploy/tmp

sudo cp -r ~/deploy/tmp/admin-base /var/www/admin-base

sudo chown -R www-data:ubuntu /var/www/admin-base



sudo systemctl reload nginx

echo "Done!"