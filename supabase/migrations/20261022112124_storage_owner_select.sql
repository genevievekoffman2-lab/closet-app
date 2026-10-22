create policy "Owner select" on storage.objects for select
  using (bucket_id = 'item-images' and auth.uid() = '827b8821-ca82-4d79-adb0-332629a015ba');